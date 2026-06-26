import { useUser } from "@/hooks/useUser"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

import userApi from "@/api/user"
import { useNavigate } from "react-router"
import { LogOutIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const Profile = () => {
  const { data, isLoading } = useUser()
  const navigate = useNavigate()
  const logout = async () => {
    await userApi.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    navigate("/", { replace: true })
  }
  if (isLoading || !data?.image) return <p>Loading...</p>
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto gap-3 px-2 py-2 hover:bg-muted"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={data?.image} alt={data?.name} />
              <AvatarFallback>
                {data?.name
                  ?.split(" ")
                  .map((n: string[]) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {data?.name?.split(" ")[0]}
              </span>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-72 p-0" align="end">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={data?.image} alt={data?.name} />
                <AvatarFallback>
                  {data?.name
                    ?.split(" ")
                    .map((n: string[]) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate font-semibold">{data?.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {data?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Profile
