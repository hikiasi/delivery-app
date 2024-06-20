import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma.service'
import { ProductDto } from './dto/product.dto'
import { generateSlug } from 'src/utils/generate-slug'
import { returnProductObject } from './return-product.object'
import { CategoryService } from 'src/category/category.service'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async search(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: returnProductObject
		})
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObject
		})

		if (!product) throw new Error('Категория не найдена')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObject
		})

		if (!products) throw new Error('Продукты не найдены')

		return products
	}

	async create() {
		return this.prisma.product.create({
			data: {
				name: '',
				slug: '',
				image: '',
				description: '',
				price: 0
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		const { name, description, price, categoryId, image } = dto

		await this.categoryService.byId(categoryId)

		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				name,
				description,
				price,
                image,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: string) {
		return this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
