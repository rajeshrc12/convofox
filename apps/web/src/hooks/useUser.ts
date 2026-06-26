import userApi from "@/api/user"
import { useQuery } from "@tanstack/react-query"

const getUser = async () => {
  const res = await userApi.get("/user")
  return res.data
}

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })
}
