// import { __ } from '@wordpress/i18n';
// import {
// 	RichText,
// 	useBlockProps,
// 	MediaUploadCheck,
// 	MediaUpload,
// } from '@wordpress/block-editor';
// import {
// 	Button,
// 	TextControl,
// 	Card,
// 	CardBody
// } from '@wordpress/components';
// import { useCallback } from '@wordpress/element';

// import './editor.scss';

// export default function Edit({ attributes, setAttributes }) {
// 	const {
// 		teamMemberName,
// 		teamMemberPosition,
// 		teamMemberImageId,
// 		teamMemberImageUrl,
// 		teamSocialLinks = []
// 	} = attributes;

// 	const blockProps = useBlockProps({ className: 'team-member-profile' });

// 	const onImageSelect = (media) => {
// 		setAttributes({
// 			teamMemberImageId: media.id,
// 			teamMemberImageUrl: media.url,
// 		});
// 	};

// 	const onRemoveImage = () => {
// 		setAttributes({
// 			teamMemberImageId: undefined,
// 			teamMemberImageUrl: undefined,
// 		});
// 	};

// 	// Add social link
// 	const addSocialLink = useCallback(() => {
// 		setAttributes({
// 			teamSocialLinks: [...teamSocialLinks, { icon: '', link: '' }],
// 		});
// 	}, [teamSocialLinks]);

// 	// Update specific link or icon
// 	const updateSocialLink = useCallback((index, key, value) => {
// 		const updated = [...teamSocialLinks];
// 		updated[index][key] = value;
// 		setAttributes({ teamSocialLinks: updated });
// 	}, [teamSocialLinks]);

// 	// Remove a link
// 	const removeSocialLink = useCallback((index) => {
// 		const updated = teamSocialLinks.filter((_, i) => i !== index);
// 		setAttributes({ teamSocialLinks: updated });
// 	}, [teamSocialLinks]);

// 	return (
// 		<div {...blockProps}>
// 			<MediaUploadCheck>
// 				<MediaUpload
// 					onSelect={onImageSelect}
// 					allowedTypes={['image']}
// 					value={teamMemberImageId}
// 					render={({ open }) => (
// 						<button onClick={open} className="button button-large">
// 							{!teamMemberImageUrl ? (
// 								__('Upload Image', 'team-member-profile')
// 							) : (
// 								<img src={teamMemberImageUrl} alt={__('Team Member Image', 'team-member-profile')} />
// 							)}
// 						</button>
// 					)}
// 				/>
// 			</MediaUploadCheck>

// 			{teamMemberImageUrl && (
// 				<Button
// 					isDestructive
// 					variant="secondary"
// 					onClick={onRemoveImage}
// 					style={{ marginBottom: '1rem' }}
// 				>
// 					{__('Remove Image', 'team-member-profile')}
// 				</Button>
// 			)}

// 			<RichText
// 				tagName="h2"
// 				className="team-member-name"
// 				value={teamMemberName}
// 				onChange={(value) => setAttributes({ teamMemberName: value })}
// 				placeholder={__('Team Member Name', 'team-member-profile')}
// 			/>

// 			<RichText
// 				tagName="h3"
// 				className="team-member-position"
// 				value={teamMemberPosition}
// 				onChange={(value) => setAttributes({ teamMemberPosition: value })}
// 				placeholder={__('Team Member Position', 'team-member-profile')}
// 			/>

// 			<div className="team-member-social-links-wrapper">

// 				{teamSocialLinks.map((item, index) => (
// 					<Card key={index} className="team-member-social-links" style={{ marginBottom: '1rem' }}>
// 						<CardBody>
// 							<TextControl
// 								label={__('Icon', 'team-member-profile')}
// 								value={item.icon}
// 								onChange={(value) => updateSocialLink(index, 'icon', value)}
// 								placeholder="facebook / twitter / linkedin"
// 								className="social-link-icon"
// 							/>
// 							<TextControl
// 								label={__('URL', 'team-member-profile')}
// 								value={item.link}
// 								onChange={(value) => updateSocialLink(index, 'link', value)}
// 								placeholder="https://"
// 								className="social-link-url"
// 							/>
// 							<Button
// 								variant="secondary"
// 								isDestructive
// 								onClick={() => removeSocialLink(index)}
// 								className="social-link-remove"
// 							>
// 								{__('Remove', 'team-member-profile')}
// 							</Button>
// 						</CardBody>
// 					</Card>
// 				))}

// 				<Button
// 					variant="primary"
// 					onClick={addSocialLink}
// 					className="social-link-add"
// 				>
// 					{__('Add New Social Link', 'team-member-profile')}
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	Card,
	CardBody,
	Modal,
	SelectControl,
} from '@wordpress/components';
import { useCallback, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		teamMemberName,
		teamMemberPosition,
		teamMemberImageId,
		teamMemberImageUrl,
		teamSocialLinks = []
	} = attributes;

	const blockProps = useBlockProps({ className: 'team-member-profile' });

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);

	const onImageSelect = (media) => {
		setAttributes({
			teamMemberImageId: media.id,
			teamMemberImageUrl: media.url,
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			teamMemberImageId: undefined,
			teamMemberImageUrl: undefined,
		});
	};

	// Add new social link and open modal
	const openModalToAdd = () => {
		const newLinks = [...teamSocialLinks, { icon: '', link: '', library: 'dashicons' }];
		setAttributes({ teamSocialLinks: newLinks });
		setEditingIndex(newLinks.length - 1);
		setIsModalOpen(true);
	};

	// Open modal to edit specific index
	const openModalToEdit = (index) => {
		setEditingIndex(index);
		setIsModalOpen(true);
	};

	const updateSocialLink = useCallback((index, key, value) => {
		const current = teamSocialLinks[index];
		if (current[key] === value) return; // no update needed
	
		const updated = [...teamSocialLinks];
		updated[index] = { ...updated[index], [key]: value };
		setAttributes({ teamSocialLinks: updated });
	}, [teamSocialLinks]);	

	const removeSocialLink = useCallback((index) => {
		const updated = teamSocialLinks.filter((_, i) => i !== index);
		setAttributes({ teamSocialLinks: updated });
	}, [teamSocialLinks]);

	const IconModal = () => {
		const item = teamSocialLinks[editingIndex];
		const [localIcon, setLocalIcon] = useState(item.icon);
		const [localLink, setLocalLink] = useState(item.link);
	
		const saveChanges = () => {
			const updated = [...teamSocialLinks];
			updated[editingIndex] = {
				...updated[editingIndex],
				icon: localIcon,
				link: localLink,
			};
			setAttributes({ teamSocialLinks: updated });
			setIsModalOpen(false);
			setEditingIndex(null);
		};
	
		return (
			<Modal
				title={__('Select Social Icon', 'team-member-profile')}
				onRequestClose={() => {
					setIsModalOpen(false);
					setEditingIndex(null);
				}}
			>
				<TextControl
					label={__('Social Icon', 'team-member-profile')}
					value={localIcon}
					onChange={setLocalIcon}
				/>
				<TextControl
					label={__('Social Link', 'team-member-profile')}
					value={localLink}
					onChange={setLocalLink}
				/>
				<Button
					variant="primary"
					onClick={saveChanges}
					style={{ marginTop: '1rem', marginRight: '1rem'}}
				>
					{__('Save', 'team-member-profile')}
				</Button>
	
				<Button
					isDestructive
					variant="secondary"
					onClick={() => {
						removeSocialLink(editingIndex);
						setIsModalOpen(false);
						setEditingIndex(null);
					}}
					style={{ marginTop: '1rem' }}
				>
					{__('Remove This Social Link', 'team-member-profile')}
				</Button>
			</Modal>
		);
	};

	return (
		<div {...blockProps}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onImageSelect}
					allowedTypes={['image']}
					value={teamMemberImageId}
					render={({ open }) => (
						<button onClick={open} className="button button-large">
							{!teamMemberImageUrl ? (
								__('Upload Image', 'team-member-profile')
							) : (
								<img src={teamMemberImageUrl} alt={__('Team Member Image', 'team-member-profile')} />
							)}
						</button>
					)}
				/>
			</MediaUploadCheck>

			{teamMemberImageUrl && (
				<Button
					isDestructive
					variant="secondary"
					onClick={onRemoveImage}
					style={{ marginBottom: '1rem' }}
				>
					{__('Remove Image', 'team-member-profile')}
				</Button>
			)}

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

			<div className="team-member-social-links-wrapper" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', textDecoration: 'none' }}>
				{teamSocialLinks.map((item, index) => (
					<div key={index} className="team-member-social-links" >
							<div className="team-member-social-link">
								<span onClick={() => openModalToEdit(index)} className={`dashicons dashicons-${item.icon}`}></span>
							</div>
					</div>
				))}

				<Button
					variant="primary"
					onClick={openModalToAdd}
					className="social-link-add"
				>
					{__('Add New Social Link', 'team-member-profile')}
				</Button>
			</div>

			{isModalOpen && editingIndex !== null && <IconModal key={editingIndex} />}
		</div>
	);
}


import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	Modal,
} from '@wordpress/components';
import { useCallback, useMemo, useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		teamMemberName,
		teamMemberPosition,
		teamMemberImageId,
		teamMemberImageUrl,
		teamSocialLinks = []
	} = attributes;

	const blockProps = useBlockProps({ className: 'team-member-profile' });

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);
	const [tempData, setTempData] = useState({ icon: '', link: '' });

	// Memoize handlers
	const openModalToAdd = useCallback(() => {
		const newItem = { icon: '', link: '', library: 'dashicons' };
		const newLinks = [...teamSocialLinks, newItem];
		setAttributes({ teamSocialLinks: newLinks });
		setTempData(newItem);
		setEditingIndex(newLinks.length - 1);
		setIsModalOpen(true);
	}, [teamSocialLinks]);

	const openModalToEdit = useCallback((index) => {
		setEditingIndex(index);
		setTempData({ ...teamSocialLinks[index] });
		setIsModalOpen(true);
	}, [teamSocialLinks]);

	const onImageSelect = (media) =>
		setAttributes({ teamMemberImageId: media.id, teamMemberImageUrl: media.url });

	const onRemoveImage = () =>
		setAttributes({ teamMemberImageId: undefined, teamMemberImageUrl: undefined });

	const saveSocialChanges = () => {
		const updated = [...teamSocialLinks];
		updated[editingIndex] = { ...updated[editingIndex], ...tempData };
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

		const reordered = Array.from(teamSocialLinks);
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);

		setAttributes({ teamSocialLinks: reordered });
	};

	const IconModal = useMemo(() => {
		if (editingIndex === null) return null;

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
				</div>
			</Modal>
		);
	}, [editingIndex, tempData]);

	return (
		<div {...blockProps}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onImageSelect}
					allowedTypes={['image']}
					value={teamMemberImageId}
					render={({ open }) => (
						<Button onClick={open} variant="primary" className="image-upload-button">
							{teamMemberImageUrl ? (
								<img src={teamMemberImageUrl} alt={__('Team Member', 'team-member-profile')} />
							) : __('Upload Image', 'team-member-profile')}
						</Button>
					)}
				/>
			</MediaUploadCheck>

			{teamMemberImageUrl && (
				<Button
					isDestructive
					variant="secondary"
					onClick={onRemoveImage}
					style={{ marginBottom: '1rem' }}
				>
					{__('Remove Image', 'team-member-profile')}
				</Button>
			)}

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
							style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
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
												...provided.draggableProps.style,
											}}
										>
											<div className="team-member-social-link">
												<span
													onClick={() => openModalToEdit(index)}
													className={`dashicons dashicons-${item.icon}`}
												></span>
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
								{__('Add New Social Link', 'team-member-profile')}
							</Button>
						</div>
					)}
				</Droppable>
			</DragDropContext>

			{isModalOpen && IconModal}
		</div>
	);
}

import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	Modal,
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
		teamSocialLinks = []
	} = attributes;

	const blockProps = useBlockProps({ className: 'team-member-profile' });

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState(null);
	const [tempData, setTempData] = useState({ icon: '', link: '', library: 'dashicons' });

	// Add new social link
	const openModalToAdd = useCallback(() => {
		const newItem = { icon: '', link: '', library: 'dashicons' };
		const newLinks = [...teamSocialLinks, newItem];
		setAttributes({ teamSocialLinks: newLinks });
		setTempData(newItem);
		setEditingIndex(newLinks.length - 1);
		setIsModalOpen(true);
	}, [teamSocialLinks]);

	// Edit existing social link
	const openModalToEdit = useCallback((index) => {
		setEditingIndex(index);
		setTempData({ ...teamSocialLinks[index] });
		setIsModalOpen(true);
	}, [teamSocialLinks]);

	const onImageSelect = (media) =>
		setAttributes({ teamMemberImageId: media.id, teamMemberImageUrl: media.url });

	const onRemoveImage = () =>
		setAttributes({ teamMemberImageId: undefined, teamMemberImageUrl: undefined });

	const saveSocialChanges = () => {
		const updated = [...teamSocialLinks];
		updated[editingIndex] = { ...tempData };
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

	// Modal Component
	const IconModal = () => {
		if (editingIndex === null) return null;

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
				</div>
			</Modal>
		);
	};

	return (
		<div {...blockProps}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={onImageSelect}
					allowedTypes={['image']}
					value={teamMemberImageId}
					render={({ open }) => (
						<>
							{teamMemberImageUrl ? (
								<div className="uploaded-image-wrapper">
									<img
										src={teamMemberImageUrl}
										alt={__('Team Member', 'team-member-profile')}
										style={{ maxWidth: '100%', height: 'auto' }}
									/>
									<Button
										isSecondary
										onClick={open}
										style={{ marginTop: '0.5rem' }}
									>
										{__('Replace Image', 'team-member-profile')}
									</Button>
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

			{teamMemberImageUrl && (
				<Button
					isDestructive
					variant="secondary"
					onClick={onRemoveImage}
					style={{ marginTop: '0.5rem' }}
				>
					{__('Remove Image', 'team-member-profile')}
				</Button>
			)}

			{/* <MediaUploadCheck>
				<MediaUpload
					onSelect={onImageSelect}
					allowedTypes={['image']}
					value={teamMemberImageId}
					render={({ open }) => (
						<Button onClick={open} variant="primary" className="image-upload-button">
							{teamMemberImageUrl ? (
								<img src={teamMemberImageUrl} alt={__('Team Member', 'team-member-profile')} />
							) : __('Upload Image', 'team-member-profile')}
						</Button>
					)}
				/>
			</MediaUploadCheck>

			{teamMemberImageUrl && (
				<Button
					isDestructive
					variant="secondary"
					onClick={onRemoveImage}
					style={{ marginBottom: '1rem' }}
				>
					{__('Remove Image', 'team-member-profile')}
				</Button>
			)} */}

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
							style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
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
								{__('Add New Social Link', 'team-member-profile')}
							</Button>
						</div>
					)}
				</Droppable>
			</DragDropContext>

			{isModalOpen && <IconModal />}
		</div>
	);
}