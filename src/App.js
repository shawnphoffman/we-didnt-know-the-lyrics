import React, { memo } from 'react'
import { FirebaseDatabaseProvider } from '@react-firebase/database'
import * as Sentry from '@sentry/react'
import firebase from 'firebase'

import { Content } from 'components/core/Layout'
import Error from 'components/Errors/AppError'
import Podcasts from 'components/Podcasts'
import Song from 'components/Song'
import { firebaseConfig } from 'utils/firebaseConfig'

const App = () => {
	return (
		<Sentry.ErrorBoundary fallback={<Error />}>
			<React.Profiler id="App">
				<FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
					<Content>
						<Podcasts />
						<Song />
					</Content>
				</FirebaseDatabaseProvider>
			</React.Profiler>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
