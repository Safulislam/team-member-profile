import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	SelectControl,
	Modal,
	PanelBody,
} from '@wordpress/components';
import { useCallback, useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		teamMemberName,
		teamMemberPosition,
		teamMemberImageId,
		teamMemberImageUrl,
		teamSocialLinks = [],
		backgroundColor,
		textColor,
		styleVariation,
	} = attributes;

	const blockProps = useBlockProps({
		className: `team-member-profile is-style-${styleVariation}`,
		style: {
			backgroundColor,
			color: textColor,
		},
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);
	const [tempData, setTempData] = useState({ icon: '', link: '', library: 'dashicons' });

	const onImageSelect = (media) =>
		setAttributes({ teamMemberImageId: media.id, teamMemberImageUrl: media.url });

	const onRemoveImage = () =>
		setAttributes({ teamMemberImageId: undefined, teamMemberImageUrl: undefined });

	const openModalToAdd = useCallback(() => {
		setTempData({ icon: '', link: '', library: 'dashicons' });
		setEditingIndex(null);
		setIsModalOpen(true);
	}, []);

	const openModalToEdit = useCallback((index) => {
		setEditingIndex(index);
		setTempData({ ...teamSocialLinks[index] });
		setIsModalOpen(true);
	}, [teamSocialLinks]);

	const saveSocialChanges = () => {
		const updated = [...teamSocialLinks];

		if (editingIndex === null) {
			updated.push({ ...tempData });
		} else {
			updated[editingIndex] = { ...tempData };
		}

		setAttributes({ teamSocialLinks: updated });
		setIsModalOpen(false);
		setEditingIndex(null);
	};

	const removeSocialLink = useCallback((index) => {
		const updated = [...teamSocialLinks];
		updated.splice(index, 1);
		setAttributes({ teamSocialLinks: updated });
	}, [teamSocialLinks]);

	const onDragEnd = (result) => {
		if (!result.destination) return;
		const reordered = [...teamSocialLinks];
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);
		setAttributes({ teamSocialLinks: reordered });
	};

	const IconModal = useCallback(() => {
		if (!isModalOpen) return null;

		return (
			<Modal
				title={__('Edit Social Link', 'team-member-profile')}
				onRequestClose={() => {
					setIsModalOpen(false);
					setEditingIndex(null);
				}}
			>
				<TextControl
					label={__('Social Icon', 'team-member-profile')}
					value={tempData.icon}
					onChange={(val) => setTempData((prev) => ({ ...prev, icon: val }))}
				/>
				<TextControl
					label={__('Social Link', 'team-member-profile')}
					value={tempData.link}
					onChange={(val) => setTempData((prev) => ({ ...prev, link: val }))}
				/>
				<div style={{ marginTop: '1rem' }}>
					<Button variant="primary" onClick={saveSocialChanges} style={{ marginRight: 10 }}>
						{__('Save', 'team-member-profile')}
					</Button>
					{editingIndex !== null && (
						<Button
							isDestructive
							variant="secondary"
							onClick={() => {
								removeSocialLink(editingIndex);
								setIsModalOpen(false);
								setEditingIndex(null);
							}}
						>
							{__('Remove This Social Link', 'team-member-profile')}
						</Button>
					)}
				</div>
			</Modal>
		);
	}, [isModalOpen, tempData, editingIndex]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Color Settings" initialOpen={true}>
					<PanelColorSettings
						title="Color Options"
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (color) => setAttributes({ backgroundColor: color }),
								label: __('Background Color', 'team-member-profile'),
							},
							{
								value: textColor,
								onChange: (color) => setAttributes({ textColor: color }),
								label: __('Text Color', 'team-member-profile'),
							},
						]}
					/>
				</PanelBody>
				<PanelBody title="Style Settings" initialOpen={true}>
					<SelectControl
						label="Layout Style"
						value={styleVariation}
						options={[
							{ label: 'Card', value: 'card' },
							{ label: 'List', value: 'list' },
							{ label: 'Minimal', value: 'minimal' },
						]}
						onChange={(value) => setAttributes({ styleVariation: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onImageSelect}
						allowedTypes={['image']}
						value={teamMemberImageId}
						render={({ open }) => (
							<>
								{teamMemberImageUrl ? (
									<div className="team-member-img-wrapper">
										<img
											src={teamMemberImageUrl}
											alt={__('Team Member', 'team-member-profile')}
										/>
										<span
											className="team-member-image-replace dashicons dashicons-edit"
											onClick={open}
											title={__('Replace Image', 'team-member-profile')}
										></span>
										<span
											className="team-member-image-remove dashicons dashicons-no"
											onClick={onRemoveImage}
											title={__('Remove Image', 'team-member-profile')}
										></span>
									</div>
								) : (
									<Button
										onClick={open}
										variant="primary"
										className="image-upload-button"
									>
										{__('Upload Image', 'team-member-profile')}
									</Button>
								)}
							</>
						)}
					/>
				</MediaUploadCheck>

				<div className="team-member-details">
					<RichText
						tagName="h2"
						className="team-member-name"
						value={teamMemberName}
						onChange={(value) => setAttributes({ teamMemberName: value })}
						placeholder={__('Team Member Name', 'team-member-profile')}
					/>
					<RichText
						tagName="h3"
						className="team-member-position"
						value={teamMemberPosition}
						onChange={(value) => setAttributes({ teamMemberPosition: value })}
						placeholder={__('Team Member Position', 'team-member-profile')}
					/>

					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="social-icons" direction="horizontal">
							{(provided) => (
								<div
									className="team-member-social-links-wrapper"
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{teamSocialLinks.map((item, index) => (
										<Draggable key={index} draggableId={`social-${index}`} index={index}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className="team-member-social-links"
													style={{
														userSelect: 'none',
														cursor: 'grab',
														...provided.draggableProps.style,
													}}
												>
													<div
														className="team-member-social-link"
														onClick={() => openModalToEdit(index)}
													>
														<span className={`dashicons dashicons-${item.icon}`}></span>
													</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<Button
										variant="primary"
										onClick={openModalToAdd}
										className="social-link-add"
									>
										{__('+', 'team-member-profile')}
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>

					{IconModal()}
				</div>
			</div>
		</>
	);
}
