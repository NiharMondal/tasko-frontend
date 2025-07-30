import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
type TODialogProps = {
	dialogTrigger: React.ReactNode;
	children: React.ReactNode;
	title: string;
};
export default function TODialog({
	dialogTrigger,
	children,
	title,
}: TODialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-3">
					<DialogTitle className="text-center">{title}</DialogTitle>
					<DialogDescription className="sr-only">
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>

				{children}
			</DialogContent>
		</Dialog>
	);
}
