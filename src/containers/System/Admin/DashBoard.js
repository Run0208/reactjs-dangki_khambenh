import { Component } from 'react';
import './DashBoard.scss';
import StatusCard from './StatusCard';
import statusCard from '../../../assets/JsonData/dashboard.json'
import Chart from './Chart';
import { getAllClinic, getAllDoctors, getAllSpecialty, getAllPatient } from '../../../services/userService';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
            dataDoctors: [],
            dataSpecialties: [],
            dataPatients: [],
        }
    }

    async componentDidMount() {
        let resClinic = await getAllClinic();
        let resDoctor = await getAllDoctors();
        let resSpecialty = await getAllSpecialty();
        let resPatient = await getAllPatient();
        if(resClinic && resClinic.errCode === 0) {
            this.setState({
                dataClinics: resClinic.data ? resClinic.data : [],
            })
        }
        if(resDoctor && resDoctor.errCode === 0) {
            this.setState({
                dataDoctors: resDoctor.data ? resDoctor.data : [],
            })
        }
        if(resSpecialty && resSpecialty.errCode === 0) {
            this.setState({
                dataSpecialties: resSpecialty.data ? resSpecialty.data : [],
            })
        }
        if(resPatient && resPatient.errCode === 0) {
            this.setState({
                dataPatients: resPatient.data ? resPatient.data : [],
            })
        }
    }
    
    render() {
        
        let { dataClinics, dataDoctors, dataSpecialties, dataPatients } = this.state;
        const countClinic = dataClinics.length;
        const countDoctor = dataDoctors.length;
        const countSpecialty = dataSpecialties.length;
        const countPatient = dataPatients.length;

        const array = [ 
            countDoctor, countPatient, countClinic, countSpecialty
        ]

        for(let i = 0; i < statusCard.length; i++) {
            statusCard[i].count = array[i]
        }


        // console.log('Array: ', array);
        // console.log('Status: ', statusCard);
        
        return (
            <div className="manage-dashboard">
                <div className="dashboard-top">
                    <div className="dashboard-top-left">
                        {
                            statusCard.map((item, index) => (
                                
                                <StatusCard
                                    key={index}
                                    name={item.name}
                                    icon={item.icon}
                                    count={item.count}
                                />
                            ))
                        }
                    </div>
                    <div className="dashboard-top-right">
                        <Chart />
                    </div>
                    
                </div>
                <div className="dashboard-bottom"></div>
            </div>
        );
    }
}

export default DashBoard