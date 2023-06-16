import React from 'react';
import PropTypes from 'prop-types';

/**
 * An emoji component to properly display an emoji in the web with accessiblity 
 * @component
 * @example
 *<Emoji symbol="🚌" label="Bus"/>
 */
const Emoji = props => (
    <span
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        {...props}
    >
        {props.symbol}
    </span>
);

Emoji.propTypes = {
    /**
     * The description of the emoji
     */
    label: PropTypes.string.isRequired,

    /**
     * The emoji
     */
    symbol: PropTypes.string.isRequired
}

export default Emoji;