import Bull from 'bull'
import redisConfig from '../config/redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map((job) => ({
	bull: new Bull(job.key, redisConfig),
	name: job.key,
	options: job.options,
	handle: job.handle,
}))

export default {
	queues,
	add(name, data) {
		const queue = this.queues.find((queue) => queue.name === name)

		return queue.bull.add(data, queue.options)
	},
	process() {
		return queues.forEach((queue) => {
			queue.bull.process(queue.handle)

			queue.bull.on('failed', (job) => {
				console.error('Job failed', queue.key, job.data)
			})
		})
	},
}
