import assert from 'assert';

const search = (delta, a, i, j, v) => {
	while (i < j) {
		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		const j_ = (j - 1) | 0;
		const w = delta(a[j_], a[i]);
		const l = delta(v, a[i]);
		assert(w >= 0);
		if (w === 0) {
			if (l === 0) return i;
			// eslint-disable-next-line no-bitwise
			if (l < 0) return ~i;
			// eslint-disable-next-line no-bitwise
			return ~j;
		}

		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		const p = (i + (((l / w) * ((j_ - i) | 0)) | 0)) | 0;
		const m = Math.max(i, Math.min(j_, p));
		const d = delta(v, a[m]);
		if (d < 0) j = m;
		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		else if (d > 0) i = (m + 1) | 0;
		else return m;
	}

	// eslint-disable-next-line no-bitwise
	return ~j;
};

export default search;
