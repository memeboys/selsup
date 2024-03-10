import React from 'react';

type Color = string

interface Param {
    id: number;
    name: string;
    type: React.HTMLInputTypeAttribute;
}

interface ParamValue {
    paramId: number;
    value: string | number | boolean;
}

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    handleParamValueChange = (paramId: number, value: string | boolean) => {
        const { paramValues } = this.state;

        const updatedParamValues = paramValues.map((paramValue) => {
            if (paramValue.paramId === paramId) {
                return { ...paramValue, value };
            }
            return paramValue;
        });

        this.setState({ paramValues: updatedParamValues });
    };

    getModel = (): Model => {
        const { paramValues } = this.state;
        const { colors } = this.props.model;
        const data = {
            paramValues,
            colors,
        }
        console.log(data)

        return data;
    };

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <div>
                {params.map((param) => {
                    const paramValue = paramValues.find((paramValue) => paramValue.paramId === param.id);
                    return (
                        <div key={param.id}>
                            <label>{param.name}</label>
                            {param.type === 'string' && typeof paramValue?.value === "string" &&
                                <input
                                    type={param.type}
                                    value={paramValue ? paramValue.value : ''}
                                    onChange={(e) => this.handleParamValueChange(param.id, e.target.value)}
                                />
                            }
                        </div>
                    );
                })}
                <button onClick={this.getModel}>getModel</button>
            </div>
        );
    }
}

const params = [
    {
        id: 1,
        name: 'Назначение',
        type: 'string',
    },
    {
        id: 2,
        name: 'Длина',
        type: 'string',
    },
];

const model = {
    paramValues: [
        {
            paramId: 1,
            value: 'повседневное',
        },
        {
            paramId: 2,
            value: 'макси',
        },
        {
            paramId: 3,
            value: false,
        },
        {
            paramId: 4,
            value: 123,
        },
    ],
    colors: [],
};

class App extends React.Component {
    render() {
        return (
            <div>
                <ParamEditor params={params} model={model} />
            </div>
        );
    }
}

export default App;