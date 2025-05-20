
import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,

	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/group'],
				transform: (attributes, innerBlocks) => {
					return createBlock(metadata.name, {
						backgroundColor: attributes.backgroundColor || '#ffffff',
						textColor: attributes.textColor || '#000000',
					});
				}
			},
			{
				type: 'block',
				blocks: ['core/columns'],
				transform: () => createBlock(metadata.name)
			}
		],
		to: [
			{
				type: 'block',
				blocks: ['core/group'],
				transform: (attributes) => {
					return createBlock('core/group', {
						backgroundColor: attributes.backgroundColor,
						textColor: attributes.textColor,
					});
				}
			},
			{
				type: 'block',
				blocks: ['core/columns'],
				transform: () => createBlock('core/columns')
			}
		]
	}

} );
