import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';


class List extends React.Component {
    constructor(){
        super();

        this.state = {
            loading: false,
            updating: false,
            currencies: [],
            error: null,
            interval: null,
        };
    }

    componentDidMount() {

        this.fetchCurrencies();

        this.interval = setInterval(() => {
            this.setState({ updating: true })
            this.fetchCurrencies();
        }, 10000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        fetch(`${API_URL}/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,XLM,LTC,OMG,ADA,TRX,XMR,DASH,ETC,NEO,BNB,XEM,VET,XTZ,ZEC,LSK&tsyms=USD`)
            .then(handleResponse)
            .then((data) => {
                console.log(data.DISPLAY)
                this.setState({ currencies: data.DISPLAY, loading: false });
            }).then(() => {
                setTimeout( () => {
                    this.setState({ updating: false });
                }, 500)
            })
            .catch((error) => {
                this.setState({ error: error.errorMessage, loading: false })
            })
    }

    render() {

        const { loading, error, currencies } = this.state;
  
        // Render only loading
        if( loading || typeof currencies.BTC === 'undefined' ) {
            return <div className="loading-container"><Loading /></div>
        }

        // Render only error message
        if( error ){
            return <div className="error">{error}</div>
        }

        
        return(
            <Table 
                currencies={currencies} 
                updating={this.state.updating} 
            />
        )
    }
}

export default List;