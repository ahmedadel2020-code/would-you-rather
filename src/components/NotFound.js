import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <Card>
                    <Card.Content>
                        <Card.Header textAlign='center'>404 Not Found</Card.Header>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default NotFound
