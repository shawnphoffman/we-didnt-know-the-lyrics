import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { styled } from '@linaria/react'
import convert from 'xml-js'

const cacheKey = 'podcasts'

const Podcasts = () => {
	const [podcasts, setPodcasts] = useState([])
	const [selected, setSelected] = useState()

	useEffect(() => {
		const cachedValue = localStorage.getItem(cacheKey)
		if (cachedValue) {
			console.log('cached')
			// TODO expiration
			setPodcasts(JSON.parse(cachedValue))
		} else {
			console.log('not cached')
			fetch('https://geekdudes.libsyn.com/rss/page/1/size/10000')
				.then(response => response.text())
				.then(data => {
					const json = convert.xml2js(data, {
						compact: true,
						ignoreDeclaration: true,
						ignoreComment: true,
						trim: true,
						cdataKey: 'data',
						textKey: 'text',
						attributesKey: 'attributes',
						nativeTypeAttributes: true,
						nativeType: true,
					})
					localStorage.setItem(cacheKey, JSON.stringify(json.rss.channel.item))
					setPodcasts(json.rss.channel.item)
				})
		}
	}, [])

	useEffect(() => {
		if (podcasts.length === 0) return
		console.log('PODCASTS LOADED', podcasts.length)
		setSelected(podcasts[0].guid.data)
	}, [podcasts])

	useEffect(() => {
		console.log('NEW SELECTION', selected)
	}, [selected])

	const handleChange = useCallback(event => {
		setSelected(event.target.value)
	}, [])

	const podcastDetail = useMemo(() => {
		if (!selected || !podcasts) return
		const p = podcasts.find(pod => pod.guid.data === selected)
		// return p
		return {
			title: p.title.text,
			date: new Date(p.pubDate.text),
			guid: p.guid.data,
			link: p.link.data,
			image: p['itunes:image'].attributes.href,
			file: {
				length: p.enclosure.attributes.length,
				type: p.enclosure.attributes.type,
				url: p.enclosure.attributes.url,
			},
			duration: p['itunes:duration'].text,
			descriptionRaw: p.description.data,
		}
	}, [podcasts, selected])

	return (
		<>
			<h1>Podcast List</h1>
			<select value={selected} onChange={handleChange}>
				{podcasts.map(p => {
					return <Option key={p.guid.data} podcast={p} />
				})}
			</select>
			<PodcastDetails podcast={podcastDetail} />
			{/* <pre>{JSON.stringify(podcasts, null, 2)}</pre> */}
		</>
	)
}

const Option = memo(({ podcast: p }) => {
	// console.log(p.title.text, p)
	return <option value={p.guid.data}>{p.title.text}</option>
})

const PodcastDetails = memo(({ podcast }) => {
	const ref = useRef()

	const handleCanPlay = useCallback(event => {
		console.log('CAN PLAY', {
			event,
			t: ref.current,
		})

		// ref.current.audioEl.current.play()

		// NOTE - This was the old way of seeking the player but I'm using fragments instead
		// Browsers are dumb
		// if (ref.current.audioEl.current.currentTime < 30) {
		// 	ref.current.audioEl.current.currentTime = 30
		// }
	}, [])

	if (!podcast) return null
	return (
		<div>
			<PodcastHeader>
				<h2>{podcast.title}</h2>
				<a href={podcast.link} target="_blank" rel="noreferrer">
					<i className="fas fa-link" />
				</a>
			</PodcastHeader>
			<PodcastImage src={podcast.image} alt="Cover Art" />

			<div>Date: {podcast.date.toDateString()}</div>
			<div>Duration: {podcast.duration}</div>
			<small dangerouslySetInnerHTML={{ __html: podcast.descriptionRaw }} />
			<ReactAudioPlayer
				// Media Fragment
				// https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery#specifying_playback_range
				// src={`${podcast.file.url}#t=20,23`}
				src={`${podcast.file.url}#t=55:06,56:46`}
				ref={ref}
				preload="auto"
				onCanPlay={handleCanPlay}
				controls
			/>
			{/* <pre>{JSON.stringify(podcast.file, null, 2)}</pre> */}
		</div>
	)
})

const PodcastHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const PodcastImage = styled.img`
	width: 100%;
`

export default memo(Podcasts)
