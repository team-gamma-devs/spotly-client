// this will wait for the github auth to either resolve or reject.
export async function loginGithub() {
	console.log('Handling github auth');
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return '/app/graduate';
}
