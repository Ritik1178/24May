import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions';

function App() {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();

    return (
        <div style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1>Redux Counter App</h1>
            <div style={{ 
                margin: '20px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                display: 'inline-block'
            }}>
                <button 
                    onClick={() => dispatch(decrement())}
                    style={{
                        padding: '10px 20px',
                        margin: '0 10px',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }}
                >
                    -
                </button>
                <span style={{ 
                    fontSize: '24px',
                    margin: '0 20px'
                }}>
                    {count}
                </span>
                <button 
                    onClick={() => dispatch(increment())}
                    style={{
                        padding: '10px 20px',
                        margin: '0 10px',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }}
                >
                    +
                </button>
            </div>
            <div style={{ 
                marginTop: '20px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px',
                maxWidth: '400px',
                margin: '20px auto'
            }}>
                <h3>Current State:</h3>
                <pre style={{ 
                    textAlign: 'left',
                    backgroundColor: '#fff',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    {JSON.stringify({ count }, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default App; 