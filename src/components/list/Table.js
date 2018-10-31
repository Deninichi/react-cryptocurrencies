import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { COINS_NAMES } from '../../config';
import { renderChangePercent } from '../../helpers';
import './Table.css';

const Table = (props) => {

    const { currencies, updating, history } = props;

    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-head">
                    <tr>
                        <th>Criptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {Object.keys(currencies).map((currency, index) => (
                        <tr 
                            key={currency}
                            onClick={() => history.push(`/currency/${currency}`)}
                        >
                            <td>
                                <span className="table-rank">{index+1}</span>{COINS_NAMES[currency]} ({currency})
                                </td>
                            <td>
                                <span className={ updating ? 'table-dollar updating' : 'table-dollar' }>{currencies[currency].USD.PRICE}</span>
                            </td>
                            <td>
                                <span className="table-dollar">{currencies[currency].USD.MKTCAP}</span>
                            </td>
                            <td>
                                { renderChangePercent( currencies[currency].USD.CHANGEPCT24HOUR ) }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    currencies: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default withRouter(Table);