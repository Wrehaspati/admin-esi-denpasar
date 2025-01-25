import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog";
import { ApplicationForm } from "./application-form";
 
export function ApplicationRequestDialog() {
  const { dialogs, closeDialog } = useDialog();

  return (
    <Dialog open={dialogs["dialogEditRequestApp"]?.isOpen} onOpenChange={() => closeDialog("dialogEditRequestApp")}>
      <DialogContent className="max-h-screen overflow-y-auto no-scrollbar max-w-3xl">
        <DialogHeader>
          <DialogTitle>Form Edit Application</DialogTitle>
          <DialogDescription>
            Edit the application&apos;s information.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm application={dialogs["dialogEditRequestApp"]?.currentItem}/>
      </DialogContent>
    </Dialog>
  )
};