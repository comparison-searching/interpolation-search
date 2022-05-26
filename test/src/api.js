import test from 'ava';

import {macro, units} from '@comparison-searching/specification';

import {search as _search} from '#module';

const search = {
	name: 'interpolation search',
	fn: _search,
};

const increasing = {
	name: 'increasing',
	fn: (a, b) => Number(a - b),
};

const decreasing = {
	name: 'decreasing',
	fn: (a, b) => Number(b - a),
};

const delta = [increasing, decreasing];

const largeArray = {
	array: [Int32Array],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	length: [(10 ** 6) | 0],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	min: [-(2 ** 31) | 0],
	// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
	max: [(2 ** 31 - 1) | 0],
	delta: [increasing],
};

const seed = [123, 456];

for (const args of [
	{delta},
	{delta, length: [333, 1000, 10_000]},
	largeArray,
]) {
	// For (const args of [largeArray]) {
	for (const unit of units(args)) {
		test(macro, {...unit, seed, search});
	}
}
