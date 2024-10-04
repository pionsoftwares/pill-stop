import React from 'react'

import { ReasonContext } from '../context/ReasonContext'

const useReason = () => {
    const { reason } = React.useContext(ReasonContext)

    return reason
}

export default useReason
