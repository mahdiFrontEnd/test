import {Card, CardBody, CardTitle} from 'reactstrap';
import PropTypes from 'prop-types';

const ComponentCard = ({children, title, bg, classNames = 'mb-2',CardBodyClass=''}) => {
    return (
        <>
            {bg ? (
                <div className="mb-0">
                    <div>{children}</div>
                </div>
            ) : (
                <Card className={classNames}>
                    {title && <CardTitle tag="h4" className="border-bottom p-3 mb-0">
                        {title}
                    </CardTitle>
                    }
                    <CardBody className={CardBodyClass}>
                        <div>{children}</div>
                    </CardBody>
                </Card>
            )}
        </>
    );
};

ComponentCard.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default ComponentCard;
