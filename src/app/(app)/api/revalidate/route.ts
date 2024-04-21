import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

type WebhookPayload = {
    _type: string
}

export const POST = async (request: NextRequest) => {
    try {
        const { isValidSignature, body } = await parseBody<WebhookPayload>(
            request,
            process.env.SANITY_REVALIDATE_SECRET
        )

        if (!isValidSignature) {
            const message = 'Invalid signature'
            return new Response(
                JSON.stringify({ message, isValidSignature, body }),
                { status: 401 }
            )
        }

        if (!body?._type) {
            const message = 'Bad Request'
            return new Response(JSON.stringify({ message, body }), {
                status: 400
            })
        }

        // If the `_type` is `page`, then all `client.fetch` calls with
        // `{next: {tags: ['page']}}` will be revalidated
        revalidateTag(body._type)

        return NextResponse.json({ body })
    } catch (err) {
        console.error(err)
        return new Response((err as Error).message, { status: 500 })
    }
}
