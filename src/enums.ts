'use strict';

export enum TriggerType {
	threshold = 'threshold',
	range = 'range',
	dynamic = 'dynamic',
	scroll = 'scroll'
}


export enum ActionType {
	class = 'class',
	style = 'style',
	custom = 'custom',
}


export enum Side {
	top = 'top',
	right = 'right',
	bottom = 'bottom',
	left = 'left',
	y = 'y',
	x = 'x'
}


export enum ViewportPosition {
	before = -1,
	in = 0,
	after = 1
}


export enum CssPropertyType {
	px = 'px',
	percent = '%',
	vh = 'vh',
	vw = 'vw',
	rem = 'rem',
	em = 'em',
	none = ''
}


export enum Direction {
	up = 'up',
	down = 'down',
	left = 'left',
	right = 'right',
	vertical = 'vertical',
	horizontal = 'horizontal'
}


export enum TriggerState {
	final = 'final',
	on = 'on',
	initial = 'initial'
}


export enum ColorType {
	hex = 'hex',
	name = 'name',
	rgb = 'rgb',
	rgba = 'rgba'
}