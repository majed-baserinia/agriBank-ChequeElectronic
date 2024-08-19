export type Props = {
	children: React.ReactNode;
};

export default function Slides({ children }: Props) {
	return <ul className="glide__slides">{children}</ul>;
}
