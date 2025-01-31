import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'
import { translate } from '@docusaurus/Translate'

interface BacklinksData {
	[key: string]: {
		[key: string]: string
	}
}

type Props = {
	documentPath: string
}

const Backlink: React.FC<Props> = ({ documentPath }) => {
	const [backlinks, setBacklinks] = useState<BacklinksData>({})

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

	const backlinkItems = backlinks[documentPath] || {}

	return (
		<div className={styles.backlinkTable}>
			<h2 className={styles.backlinkTableH2}>
				{translate({
					id: 'backlink.title',
					message: 'Ссылки на эту страницу',
					description: 'Заголовок блока обратных ссылок',
				})}
			</h2>
			<div className={styles.backlinkGridView}>
				{Object.keys(backlinkItems).length > 0 ? (
					Object.entries(backlinkItems)
						.sort()
						.reverse()
						.map(([link, description]) => (
							<Link to={link} className={styles.backlinkItemLink} key={link}>
								<div className={styles.backlinkItem}>
									<h3 className={styles.backlinkMentionedFileName}>
										{link.split('/').filter(Boolean).pop()}
									</h3>
									<pre className={styles.backlinkItemText}>
										{description}
									</pre>
								</div>
							</Link>
						))
				) : (
					<p className={styles.noBacklink}>
						{translate({
							id: 'backlink.noBacklink',
							message: 'Обратных ссылок нет...',
							description: 'Сообщение, отображаемое при отсутствии обратных ссылок',
						})}
					</p>
				)}
			</div>
		</div>
	)
}

export default Backlink
