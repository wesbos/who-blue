function updateVerfiedIcons(tweet) {
	const parent = tweet.parentElement;
	const reactPropsKey = Object.keys(parent).filter((key) =>
		key.startsWith('__reactProps')
	)[0];
	if (reactPropsKey) {
		const { isBlueVerified, isVerified } =
			parent[reactPropsKey].children.props.children[0][0].props;
		if (!isVerified && isBlueVerified) {
			tweet.style.rotate = `0.5turn`;
			tweet.style.fill = `#ee8383`;
		}
	}
}

function getAllVerfiedAccounts() {
	const tweets = document.querySelectorAll(`[aria-label*="Verified account"]`);
	tweets.forEach((tweet) => {
		updateVerfiedIcons(tweet);
	});
}

setInterval(getAllVerfiedAccounts, 500);
