import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

const BreadCrumbs = () => {
	const { pathname } = useLocation();
	const list = pathname.split("/").filter((item) => item);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				{list.map((item, index) => {
					const href = `/${list.slice(0, index + 1).join("/")}`;
					const isLast = index === list.length - 1;
					return (
						<>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{item}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href}>{item}</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadCrumbs;
