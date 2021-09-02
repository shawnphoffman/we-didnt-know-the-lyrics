import React, { memo, useEffect, useState } from 'react'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import * as Sentry from '@sentry/react'
import firebase from 'firebase'
import convert from 'xml-js'

import { Content } from 'components/core/Layout'
import Error from 'components/Errors/AppError'
import Song from 'components/Song'
import { firebaseConfig } from 'utils/firebaseConfig'

const App = () => {
	const [podcasts, setPodcasts] = useState([])
	const cacheKey = 'podcasts'

	// useEffect(() => {
	// 	const cacheKey = 'test'
	// 	if (actions.hasCache(cacheKey, {})) {
	// 		const cachedValue = actions.getCache(cacheKey, {})
	// 		console.log('HAS CACHE', cachedValue)
	// 	} else {
	// 		console.log('NO CACHE')
	// 		actions.setCache(cacheKey, {}, 'WOW')
	// 	}
	// }, [actions])

	useEffect(() => {
		const cachedValue = localStorage.getItem(cacheKey)
		if (cachedValue) {
			console.log('cached')
			// TODO expiration
			setPodcasts(JSON.parse(cachedValue))
		} else {
			console.log('not cached')
			fetch('https://geekdudes.libsyn.com/rss')
				.then(response => response.text())
				.then(data => {
					const json = convert.xml2js(data, {
						compact: true,
						ignoreDeclaration: true,
						ignoreComment: true,
					})
					localStorage.setItem(cacheKey, JSON.stringify(json.rss.channel.item))
					setPodcasts(json.rss.channel.item)
				})
		}
	}, [])

	return (
		<Sentry.ErrorBoundary fallback={<Error />}>
			<React.Profiler id="App">
				<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
					<Content>
						<h1>Podcast List</h1>
						<select>
							{podcasts.map(p => {
								return <option key={p.guid._cdata}>{p.title._text}</option>
							})}
						</select>
						<Song />
					</Content>
				</FirebaseDatabaseProvider>
			</React.Profiler>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
