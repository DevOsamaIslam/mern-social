import { ERROR, SUCCESS, WARNING } from '#lib/constants'
import {
	asyncHandler,
	feedback,
	protectedRoute,
	returnHandler,
} from '#lib/helpers'
import Blog from '../../model/Blog'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export const getAll = async (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	console.log(_req.body)

	const data = await asyncHandler(
		Blog.find({})
			.select('-body -comments')
			.populate('author', 'profile.name')
			.limit(10)
	)
	if (!data)
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				null,
				feedback('warning', WARNING.noData)
			)
		)
	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)
	return next(
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found))
	)
}

const _getOneById = async (
	req: Request<{ id: string }>,
	_res: Response,
	next: NextFunction
) => {
	const id = req.params.id

	const data = await asyncHandler(
		Blog.findById(id)
			.populate('author', 'profile.name')
			.populate('comments.author', 'profile.name')
	)

	if (!data)
		return next(
			returnHandler(
				StatusCodes.NOT_FOUND,
				null,
				feedback('warning', WARNING.noData)
			)
		)
	if (data.error)
		return next(
			returnHandler(
				StatusCodes.INTERNAL_SERVER_ERROR,
				data.error,
				feedback('error', ERROR.SWR)
			)
		)

	return next(
		returnHandler(StatusCodes.OK, data, feedback('success', SUCCESS.found))
	)
}

export const getOneById = [protectedRoute, _getOneById]
