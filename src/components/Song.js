import React, { memo, useCallback, useState } from 'react'
import { styled } from '@linaria/react'
import { /*FirebaseDatabaseMutation,*/ FirebaseDatabaseNode } from '@react-firebase/database'
import Highlightable from 'highlightable'

const simpleHash = str => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash &= hash // Convert to 32bit integer
	}
	return new Uint32Array([hash])[0].toString(36)
}

const Line = ({ children }) => {
	const [text /*, setText*/] = useState(children)

	// const onTextHighlightedCallback = useCallback((value, runMutation, ranges) => {
	// 	const { data, end, start, text } = value
	// 	console.log('onTextHighlightedCallback', {
	// 		data,
	// 		end,
	// 		start,
	// 		text,
	// 	})
	// 	runMutation({
	// 		text: text,
	// 		ranges: [...ranges, { start, end }],
	// 	})
	// }, [])

	const onHighlightHover = useCallback(letterGroup => {
		console.log('onHighlightHover', {
			letterGroup,
			// range,
			// textCharIndex,
			// onMouseOverHighlightedWord,
		})
	}, [])

	const onHighlightClick = useCallback(letterGroup => {
		console.log('onHighlightClick', {
			letterGroup,
			// range,
			// textCharIndex,
			// onMouseOverHighlightedWord,
		})
	}, [])

	const rangeRenderer = useCallback(
		(letterGroup, range, textCharIndex, onMouseOverHighlightedWord) => {
			return (
				<Highlight
					onClick={() => onHighlightClick(letterGroup)}
					onMouseEnter={() => onHighlightHover(letterGroup)}
				>
					{letterGroup}
				</Highlight>
			)
		},
		[onHighlightClick, onHighlightHover]
	)

	const hash = simpleHash(children)

	return (
		// <FirebaseDatabaseMutation type="set" path={`lyrics/lines/${hash}`}>
		// {({ runMutation }) => (
		<FirebaseDatabaseNode path={`lyrics/lines/${hash}`}>
			{data => {
				const stored = data?.value || {}
				const ranges = stored?.ranges || []
				// console.log({ ranges })
				return (
					<LineWrapper>
						<Highlightable
							ranges={ranges}
							enabled={true}
							onTextHighlighted={() => {}}
							// onTextHighlighted={value => onTextHighlightedCallback(value, runMutation, ranges)}
							id={hash}
							// highlightStyle={{
							// 	backgroundColor: '#ffcc80',
							// }}
							text={text}
							rangeRenderer={rangeRenderer}
						/>
					</LineWrapper>
				)
			}}
		</FirebaseDatabaseNode>
		// )}
		// </FirebaseDatabaseMutation>
	)
}

const Song = () => {
	return (
		<>
			<h1>We Didn't Start the Fire</h1>
			<div>
				<Group>
					<Line>[Verse 1]</Line>
					<Line>Harry Truman, Doris Day</Line>
					<Line>Red China, Johnnie Ray</Line>
					<Line>South Pacific</Line>
					<Line>Walter Winchell, Joe DiMaggio</Line>
					<Line>Joe McCarthy, Richard Nixon</Line>
					<Line>Studebaker, Television</Line>
					<Line>North Korea, South Korea</Line>
					<Line>Marilyn Monroe</Line>
					<Line>Rosenbergs, H-Bomb</Line>
					<Line>Sugar Ray, Panmunjom</Line>
					<Line>Brando, The King And I,</Line>
					<Line>And The Catcher In The Rye</Line>
					<Line>Eisenhower, Vaccine</Line>
					<Line>England's got a new queen</Line>
					<Line>Marciano, Liberace</Line>
					<Line>Santayana goodbye</Line>
				</Group>

				<Group>
					<Line>[Chorus]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
				</Group>

				<Group>
					<Line>[Verse 2]</Line>
					<Line>Joseph Stalin, Malenkov</Line>
					<Line>Nasser and Prokofiev</Line>
					<Line>Rockefeller, Campanella</Line>
					<Line>Communist Bloc</Line>
					<Line>Roy Cohn, Juan Peron</Line>
					<Line>Toscanini, Dacron</Line>
					<Line>Dien Bien Phu Falls, "Rock Around the Clock"</Line>
					<Line>Einstein, James Dean</Line>
					<Line>Brooklyn's got a winning team</Line>
					<Line>Davy Crockett, Peter Pan</Line>
					<Line>Elvis Presley, Disneyland</Line>
					<Line>Bardot, Budapest, Alabama, Khrushchev</Line>
					<Line>Princess Grace, Peyton Place</Line>
					<Line>Trouble in the Suez</Line>
				</Group>

				<Group>
					<Line>[Chorus]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
				</Group>

				<Group>
					<Line>[Verse 3]</Line>
					<Line>Little Rock, Pasternak</Line>
					<Line>Mickey Mantle, Kerouac</Line>
					<Line>Sputnik, Zhou En-lai</Line>
					<Line>Bridge On The River Kwai</Line>
					<Line>Lebanon, Charles de Gaulle</Line>
					<Line>California baseball</Line>
					<Line>Starkweather Homicide</Line>
					<Line>Children of Thalidomide</Line>
					<Line>Buddy Holly, Ben-Hur</Line>
					<Line>Space Monkey, Mafia</Line>
					<Line>Hula Hoops, Castro</Line>
					<Line>Edsel is a no-go</Line>
					<Line>U-2, Syngman Rhee</Line>
					<Line>Payola and Kennedy</Line>
					<Line>Chubby Checker, Psycho</Line>
					<Line>Belgians in the Congo</Line>
				</Group>

				<Group>
					<Line>[Chorus]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
				</Group>

				<Group>
					<Line>[Verse 4]</Line>
					<Line>Hemingway, Eichmann</Line>
					<Line>Stranger in a Strange Land</Line>
					<Line>Dylan, Berlin</Line>
					<Line>Bay of Pigs invasion</Line>
					<Line>Lawrence of Arabia</Line>
					<Line>British Beatlemania</Line>
					<Line>Ole Miss, John Glenn</Line>
					<Line>Liston beats Patterson</Line>
					<Line>Pope Paul, Malcolm X</Line>
					<Line>British Politician sex</Line>
					<Line>J.F.K. blown away</Line>
					<Line>What else do I have to say?</Line>
				</Group>

				<Group>
					<Line>[Chorus]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
				</Group>

				<Group>
					<Line>[Verse 5]</Line>
					<Line>Birth control, Ho Chi Minh</Line>
					<Line>Richard Nixon back again</Line>
					<Line>Moonshot, Woodstock</Line>
					<Line>Watergate, punk rock</Line>
					<Line>Begin, Reagan, Palestine</Line>
					<Line>Terror on the airline</Line>
					<Line>Ayatollahs in Iran</Line>
					<Line>Russians in Afghanistan</Line>
					<Line>Wheel of Fortune, Sally Ride</Line>
					<Line>Heavy metal suicide</Line>
					<Line>Foreign debts, homeless Vets</Line>
					<Line>AIDS, crack, Bernie Goetz</Line>
					<Line>Hypodermics on the shores</Line>
					<Line>China's under martial law</Line>
					<Line>Rock and Roller cola wars</Line>
					<Line>I can't take it anymore</Line>
				</Group>

				<Group>
					<Line>[Chorus]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>But when we are gone</Line>
					<Line>It will still burn on, and on</Line>
					<Line>And on, and on</Line>
				</Group>

				<Group>
					<Line>[Outro]</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
					<Line>We didn't start the fire</Line>
					<Line>No, we didn't light it</Line>
					<Line>But we tried to fight it</Line>
					<Line>We didn't start the fire</Line>
					<Line>It was always burning</Line>
					<Line>Since the world's been turning</Line>
				</Group>
			</div>
		</>
	)
}

const Highlight = styled.span`
	background-color: #ffcc80;

	&:hover {
		background-color: lightgreen;
	}
`

const LineWrapper = styled.div`
	line-height: 1.4;
`
const Group = styled.div`
	margin-bottom: 32px;

	&:last-of-type {
		margin-bottom: 0px;
	}
`

export default memo(Song)
