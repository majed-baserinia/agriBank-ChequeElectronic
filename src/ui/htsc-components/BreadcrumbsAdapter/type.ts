export type Props = {
	breadcrumbs: link[];
};

type link = {
	key: string;
	title: string;
	href: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};
