<?php
// This file is generated. Do not modify it manually.
return array(
	'team-member-profile' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/team-member-profile',
		'version' => '0.1.0',
		'title' => 'Team Member Profile',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A customizable team member profile block.',
		'example' => array(
			
		),
		'supports' => array(
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'textdomain' => 'team-member-profile',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'styleVariation' => array(
				'type' => 'string',
				'default' => 'card'
			),
			'teamMemberName' => array(
				'type' => 'string',
				'default' => 'John Doe'
			),
			'teamMemberPosition' => array(
				'type' => 'string',
				'default' => 'Software Engineer'
			),
			'teamMemberImageId' => array(
				'type' => 'number'
			),
			'teamMemberImageUrl' => array(
				'type' => 'string'
			),
			'teamSocialLinks' => array(
				'type' => 'array',
				'default' => array(
					array(
						'link' => 'https://www.facebook.com/',
						'icon' => 'facebook'
					),
					array(
						'link' => 'https://www.twitter.com/',
						'icon' => 'twitter'
					),
					array(
						'link' => 'https://www.linkedin.com/',
						'icon' => 'linkedin'
					)
				)
			)
		)
	)
);
