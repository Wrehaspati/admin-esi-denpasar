"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import useSWR from 'swr'
import { LoadingSpinner } from "@/components/loading-spinner"
import { UserDialog } from "@/app/user/partials/user-dialog"
import { DialogProvider } from "@/context/DialogContext"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { User } from "@/types/UserType"
import UserAlertDialog from "@/app/user/partials/user-alert-dialog"
import axiosInstance from "@/lib/axios"
import useClientMiddleware from "@/hooks/client-middleware"
import LoadingScreen from "@/components/loading.screen"

export default function UserPage() {
  const [interval, setRefreshInterval] = useState<number>(600000)
  const { toast } = useToast()
  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const [isLogin, setLoginState] = useState(true)
  
  useClientMiddleware(() => {setLoginState(false)})
  
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + '/users?perPage=1000',
    fetcher, { refreshInterval: interval, revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false })

  useEffect(() => {
    if (error && isLogin) {
      setRefreshInterval(600000)
      toast({ title: "Failed to Fetch", description: "Error: " + error })
    } else {
      setRefreshInterval(10000)
    }
  }, [error, toast, isLogin])

  return (
    <SidebarProvider>
      <LoadingScreen isLoading={(isLogin && isLoading)} />
      <DialogProvider<User>>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      ESI Kota Denpasar
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex gap-2 items-center">User{isLoading ? <LoadingSpinner className="size-4" /> : ""}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-full w-screen">
            <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <DataTable columns={columns} data={data?.data?.length ? data.data : []} />
              <UserDialog />
              <UserAlertDialog />
            </div>
          </div>
        </SidebarInset>
      </DialogProvider>
    </SidebarProvider>
  )
}
