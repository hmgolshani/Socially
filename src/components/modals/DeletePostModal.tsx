import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeletePostModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const DeletePostModal = ({
  open,
  onOpenChange,
  onConfirm,
}: DeletePostModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-4 rounded-lg border border-layout-border bg-layout-bg p-6 shadow-lg ring-0 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-125 data-open:animate-none data-closed:animate-none">
        <AlertDialogHeader className="place-items-start gap-4 text-left">
          <AlertDialogTitle className="text-base font-semibold text-content-primary">
            Delete Post
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-content-primary">
            This Action Can not be undone
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mx-0 mb-0 flex-row justify-end rounded-none border-0 bg-transparent p-0">
          <AlertDialogCancel
            size="lg"
            className="px-3 transition-none active:not-aria-[haspopup]:translate-y-0"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size="lg"
            onClick={onConfirm}
            className="bg-content-red px-3 text-white transition-none hover:bg-content-red/90 active:not-aria-[haspopup]:translate-y-0"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostModal;
