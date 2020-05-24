import Mail from '../lib/Mail'

export default {
	key: 'RegistrationMail',
	async handle({ data }) {
		const { user } = data

		await Mail.sendMail({
			from: process.env.FROM_EMAIL,
			to: `${user.name} <${user.email}>`,
			subject: 'Cadastro de usuário',
			html: `Hello ${user.name}`,
		})
	},
}