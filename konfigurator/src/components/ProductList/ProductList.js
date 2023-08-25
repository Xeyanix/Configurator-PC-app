import React, { useState } from 'react';
import commonColumnsStyles from '../../common/styles/Columns.module.scss';
import Motherboards from '../../common/consts/motherboard';
import CPUs from '../../common/consts/cpu';

function ProductList(props) {
    const [wybranaPlyta, setWybranaPlyta] = useState(null);
    const [koszyk, setKoszyk] = useState([]);

    const handlePlytaClick = (motherboard) => {
        setWybranaPlyta(motherboard);
    };

    const dodajDoKoszyka = (procesor) => {
        setKoszyk(prevKoszyk => [...prevKoszyk, procesor]);
    };
    
    const productsList = Motherboards.map((motherboard) => (
        <li
            onClick={() => {
                props.dodawanie(motherboard);
                handlePlytaClick(motherboard);
            }}
            key={motherboard.id}>
            {motherboard.name},
            {motherboard.chipset}
            <button onClick={() => dodajDoKoszyka(motherboard)}>Dodaj do koszyka</button>
        </li>
    ));

    const kompatybilneProcesory = wybranaPlyta
        ? CPUs.filter(cpu => cpu.compatibleMotherboards.includes(wybranaPlyta.id))
        : [];

    return (
        <div className={commonColumnsStyles.App}>
            <header className={commonColumnsStyles.AppHeader}>
                <div>
                    <h2>Wybierz płytę główną:</h2>

                    <ul>{productsList}</ul>
                    {wybranaPlyta && (
                        <div>
                            <h3>Kompatybilne procesory dla: {wybranaPlyta.name}</h3>
                            <ul>
                                {kompatybilneProcesory.map(cpu => (
                                    <li
                                        onClick={() => {
                                            props.dodawanie(cpu);
                                        }}
                                        key={cpu.id}>
                                        {cpu.name}
                                        <button onClick={() => dodajDoKoszyka(cpu)}>Dodaj do koszyka</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </header >
        </div >
    );
}



export default ProductList;
