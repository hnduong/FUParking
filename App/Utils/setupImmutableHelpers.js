import Immutable from 'immutable'

/**
 * Checks if passed parameter is instance of an Immutable Collection
 * An instance of any Immutable Collection would have the toJS method
 * @param {Any} _
 */
Immutable.isImmutable = _ => typeof _.toJS === 'function'

/**
 * Converts an Immutable Collection to its JS counterpart, if not Immutable returns the passed parameter
 * @param {Any} _
 */
Immutable.toJS = _ => Immutable.isImmutable(_) ? _.toJS() : _
