import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		teamMemberName,
		teamMemberPosition,
		teamMemberImageUrl,
		teamSocialLinks = [],
		backgroundColor,
		textColor
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `team-member-profile is-style-${attributes.styleVariation}`,
		style: {
			backgroundColor: backgroundColor,
			color: textColor,
		},
	});

	return (
		<div {...blockProps}>
			{teamMemberImageUrl && (
				<div className='team-member-img-wrapper'>
					<img
						src={teamMemberImageUrl}
						alt={teamMemberName || 'Team Member Image'}
						className="team-member-image"
					/>
				</div>
			)}

			<div className="team-member-details">
				<RichText.Content
					tagName="h2"
					className="team-member-name"
					value={teamMemberName}
				/>

				<RichText.Content
					tagName="h3"
					className="team-member-position"
					value={teamMemberPosition}
				/>

				{teamSocialLinks.length > 0 && (
					<ul className="team-member-social-links">
						{teamSocialLinks.map((item, index) => (
							item.link && item.icon && (
								<li key={index}>
									<a href={item.link} target="_blank" rel="noopener noreferrer">
										<span className={`dashicons dashicons-${item.icon}`}></span>
									</a>
								</li>
							)
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
