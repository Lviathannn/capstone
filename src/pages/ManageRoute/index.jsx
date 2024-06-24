import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoutes } from "@/services/ManageRoute/getRoute";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoutes } from "@/services/ManageRoute/deleteRoute";
import { TableRoute } from "./TableRoute";
import { SearchRoute } from "./SearchRoute";
import { TotalRoute } from "./TotalRoute";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { privateRoutes } from "@/constant/routes";
import Notification from "@/components/features/alert/Notification";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "@/components/features/Pagination";

export default function ManageRoute() {
  const token = useSelector((state) => state.auth.user?.access_token);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery] = useDebounce(searchTerm, 1000);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { data: routes, isLoading } = useQuery({
    queryKey: ["routes", page, searchQuery],
    queryFn: () => getRoutes(token, page, searchQuery),
  });

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    if (searchQuery !== "") {
      setSearchParams({ page, searchTerm: searchQuery });
    } else {
      setSearchParams({ page });
    }
  }, [page, searchQuery, setSearchParams]);

  const createDeletedMutation = useMutation({
    mutationFn: (id) => deleteRoutes(token, id),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsError(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["routes", page, searchQuery]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsError(false);
      }, 2000);
    },
  });

  const handleRouteClick = (user) => {
    navigate(`${privateRoutes.ROUTE}/detail/${user.id}`);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDeletedById = (id) => {
    createDeletedMutation.mutate(id);
  };

  return (
    <ProtectedLayout>
      <div className="flex w-full flex-col gap-6 bg-primary-50 px-10 py-6 font-sans">
        <div className="grid grid-cols-12 gap-4">
          <SearchRoute
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            isLoading={isLoading}
          />
          <TotalRoute
            filteredData={routes?.pagination.total}
            isLoading={isLoading}
          />
        </div>
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <TableRoute
            handleRouteClick={handleRouteClick}
            handleDeletedById={handleDeletedById}
            openNotif={createDeletedMutation}
            filteredData={routes?.data}
            isLoading={isLoading}
          />
        </div>
        <div className="my-3 flex justify-center">
          <Pagination
            currentPage={routes?.pagination?.current_page}
            lastPage={routes?.pagination?.last_page}
          />
        </div>
      </div>
      <Notification
        title={isSuccess ? "Sukses !" : "Gagal !"}
        description={
          isSuccess ? "Proses berhasil dilakukan" : "Proses gagal dilakukan"
        }
        open={isSuccess || isError}
        type={isSuccess ? "success" : "error"}
      />
    </ProtectedLayout>
  );
}