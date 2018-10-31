import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import { COINS_NAMES } from '../../config';
import { handleResponse, renderChangePercent } from '../../helpers'
import Loading from '../common/Loading';
import './Detail.css';

class Detail extends React.Component {
    constructor(){
        super();

        this.state = {
            currency: {},
            loading: false,
            error: null
        }
    };

    componentDidMount() {
        const currencyId = this.props.match.params.id;

        this.setState({ loading: true })

        fetch(`${API_URL}/pricemultifull?fsyms=${currencyId}&tsyms=USD`)
            .then(handleResponse)
            .then( (currency) => {
                
                if( currency.Response === "Error" ) {
                    this.setState({
                        loading: false,
                        error: currency.Message
                    })
                } else {
                    this.setState({
                        loading: false,
                        error: null,
                        currency: currency.DISPLAY
                    });
                }

            }).catch( (error) => {
                this.setState({
                    loading: false,
                    error: error.Message
                })
            })
    }

    render(){
        const { loading, error, currency } = this.state;
        console.log(currency)

        if( loading ) {
            return <div className="loading-container"><Loading /></div>
        }

        if( error ) {
            return <div className="error">{error}</div>
        }

        return(
            <div className="detail">
                { Object.keys(currency).map((item, index) => (
                    <div className="detail-wrap" key="{item}">
                        <h1 className="detail-heading">{COINS_NAMES[item]} ({item})</h1>

                        <div className="detail-container">

                            <table>
                                <tbody>
                                    <tr>
                                        <td>Price</td>
                                        <td>{currency[item].USD.PRICE}</td>
                                    </tr>
                                    <tr>
                                        <td>24H Change</td>
                                        <td>{ renderChangePercent( currency[item].USD.CHANGEPCT24HOUR ) }</td>
                                    </tr>
                                    <tr>
                                        <td>Market Cap</td>
                                        <td>{currency[item].USD.MKTCAP}</td>
                                    </tr>
                                    <tr>
                                        <td>24H Volume</td>
                                        <td>{currency[item].USD.VOLUME24HOURTO}</td>
                                    </tr>
                                    <tr>
                                        <td>Total supply</td>
                                        <td>{currency[item].USD.SUPPLY}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/">
                                <span class="back-btn">&larr; Back</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Detail;