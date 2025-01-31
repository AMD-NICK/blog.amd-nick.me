import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'
import { translate } from '@docusaurus/Translate'

interface BacklinksData {
	links: {
		[key: string]: string[]
	}
	descriptions: {
		[key: string]: string
	}
}

type Props = {
	documentPath: string
}

const Backlink: React.FC<Props> = ({ documentPath }) => {
	const [backlinks, setBacklinks] = useState<BacklinksData>({ links: {}, descriptions: {} })

	useEffect(() => {
		const fetchBacklinks = async () => {
			try {
				const response = await fetch('/backlinks.json')
				const data = await response.json()
				setBacklinks(data)
			} catch (error) {
				console.error('Error loading backlinks:', error)
			}
		}

		fetchBacklinks()
	}, [])

	const backlinkPaths = backlinks.links[documentPath] || []

	return (
		<div className={styles.backlinkTable}>
			<h2 className={styles.backlinkTableH2}>
				{translate({
					id: 'backlink.title',
					message: 'Это страница упоминается в:',
					description: 'Заголовок блока обратных ссылок',
				})}
			</h2>
			<div className={styles.backlinkGridView}>
				{backlinkPaths.length > 0 ? (
					backlinkPaths
						.sort()
						.reverse()
						.map((link) => (
							<Link to={link} className={styles.backlinkItemLink} key={link}>
								<div className={styles.backlinkItem}>
									<h3 className={styles.backlinkMentionedFileName}>
										{link.split('/').filter(Boolean).pop()}
									</h3>
									<pre className={styles.backlinkItemText}>
										{backlinks.descriptions[link] || ''}
									</pre>
								</div>
							</Link>
						))
				) : (
					<p className={styles.noBacklink}>
						{translate({
							id: 'backlink.noBacklink',
							message: 'Другие публикации не ссылаются на эту. Пока что',
							description: 'Сообщение, отображаемое при отсутствии обратных ссылок',
						})}
					</p>
				)}
			</div>
		</div>
	)
}

export default Backlink
