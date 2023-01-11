import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
	return <main>{products && products.length}</main>;
}
export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);
	return {
		paths: menu.flatMap((menu) => menu.pages.map((page) => '/courses/' + page.alias)),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);

	const { data: page } = await axios.get<PageModel>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
	);

	const { data: products } = await axios.post<ProductModel[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find',
		{
			category: page.category,
			limit: 10,
		}
	);

	return {
		props: {
			menu,
			firstCategory,
			page,
			products,
		},
	};
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
	page: PageModel;
	products: ProductModel[];
}
