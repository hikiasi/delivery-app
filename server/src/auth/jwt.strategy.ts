import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { PrismaService } from 'prisma.service'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return this.prisma.user.findUnique({ where: { id: id } })
	}
}
