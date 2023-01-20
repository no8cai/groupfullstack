import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';

import { createPledge, getAllPledgesByProjectId, updatePledge, getPledgesByCurrentUser } from '../../../store/pledge';
import { fetchOneProject } from '../../../store/project';
import { fetchProjectRewards } from '../../../store/reward';


import '../PledgePage.css'

const PledgeDetails = ({type,projectId,pledgeId}) => {
    // console.log(projectId)
    // console.log(pledgeId)

    const dispatch = useDispatch()
    const id=projectId
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const userPledges = useSelector(state => state.pledges.userPledges)
    // console.log(userPledges, "EEEEEEEEEEE")
    const uPledges = Object.values(userPledges)
    const filtered = uPledges.filter(pledge => parseInt(pledge.projectId) === parseInt(projectId))
    // const userFilter = uPledges.filter(pledge => pledgeId ===)
    // console.log("AAAAAAAAA",filtered[0].rewardId)
    // console.log(filtered)
    // if (filtered.length === 0) console.log("no matching pledges") 
    
    let project = useSelector(state => {return state.projects[id]})

    // console.log('project page', project)

    let rewards = useSelector(state => state.rewards)

    // console.log('rewards------', rewards)
    let rewardsArr = Object.values(rewards).filter((reward)=>reward.projectId===+projectId)
    // console.log('rewardsArr-----', rewardsArr)
    const [ oKRewardId, setOkRewardId ] = useState(false)
    const thisProjectsPledges = useSelector(state => state.pledges.pledgesById)
    const pPledges = Object.values(thisProjectsPledges)
    // console.log("come ooon",pPledges)
    const pfiltered = pPledges.filter(pledge => pledge.id === parseInt(pledgeId))
    // console.log("PPPPPPP", pfiltered)
            // this means one of the rewards is correct
            
            // console.log('HELLO PLZ')
            // && oKRewardId 
        
    
    // if(rewardsArr.length === 0 ){
    //     alert('NO')
    // }

    useEffect(() => {
        dispatch(fetchOneProject(id))
        dispatch(fetchProjectRewards(id))
        dispatch(getAllPledgesByProjectId(id))
        dispatch(getPledgesByCurrentUser())
    }, [dispatch])


    // let userId = 10

    let pledges = useSelector(state => {return state.pledges})
    // let pledgesArr = Object.values(pledges)
    // console.log('-----------', pledges.userPledges[userId])
    // console.log('------------', pledgesArr[1])
    // console.log('**********', JSON.stringify(pledges).valueOf('backerId'))
    if(!rewards || !thisProjectsPledges || !userPledges) return null
    // if(!rewardsArr) return null
    // if(!project) return null
    // if(!pledges) return null


    const editPledgeBtn = (rewardId, projectId, pledgeId) => {
        const payload = {
            id:pledgeId,
            rewardId: rewardId,
        }
            dispatch(updatePledge(payload))
            history.push(`/profile/pledges`)
    }



    const createPledgeBtn = (rewardId, projectId) => {
        // if(!sessionUser) return alert('I am working')

        const payload = {
            rewardId: rewardId,
        }
           dispatch(createPledge(payload))
            .then(()=>{history.push(`/profile/pledges`)})
            .catch( (err) => {
                     alert("one user can not backup more project")
                  }
            )
    }

   



    return(
        <>
        {project !== undefined && rewardsArr.length !== 0 && filtered.length !== 0 && pfiltered.length !== 0 ? (<div className='pledge-main-container'>

<div className='pledge-project-title'>
    <Link className='project-link' key={project.title} to={`/projects/${project.id}`}>
    <h1>{project.title}</h1>
    </Link>
    <h5>{project.creator.username}</h5>
</div>
<div className='pledge-outter-container'>
<div className='pledge-ul-nav'>
    <p>Rewards {'>'} Payment</p>
</div>

<div className='reward-selection-text'>
    <h2>Select your reward </h2>
    <p>Select an option below</p>
</div>

<div className='pledge-container'>
<div className='reward-container'>
    {rewardsArr.map(reward =>{
        let chosenReward = "not-this-reward"
        // console.log(pledgeId, reward.id, reward.title)
        if (filtered[0].rewardId === reward.id) {
            chosenReward = "this-reward"}
     return (
        <ul key={reward.id}>

        <div id={chosenReward} className='reward-card'>

            <div className='reward-card-details'>
                {/* <input type='radio' />Pledge $20 */}
                <h4 className='reward-price'>${reward.price}</h4>
                <h4 className='reward-title'>{reward.title}</h4>
                <p className='reward-description'>{reward.description}</p>
            </div>
            <div className='reward-card-shipping'>
                <h6 className='reward-estimated'>ESTIMATED DELIVERY</h6>
                <h5 className='reward-estimated'>{reward.estimatedDelivery}</h5>
                <h6 className='reward-estimated'>SHIPS TO</h6>
                <h5 className='reward-estimated'>Anywhere in the world</h5>
            </div>
            {type==="Create Pledge" &&(
                <button className='pledge-button' onClick={() => createPledgeBtn(reward.id, reward.projectId)}>Pledge {reward.price}</button>
                )}
            {type==="Edit Pledge" &&(
                <button className='pledge-button' onClick={() => editPledgeBtn(reward.id, reward.projectId, pledgeId)}>Pledge {reward.price}</button>
                )}
        </div>
 </ul>
  )})}

</div>
<div className='guaranteed-container'>
<div className='guaranteed-description'>
    <img className='guaranteed-img' src='' alt="Rewards aren't guaranteed."/>
    <p>Your pledge will support an ambitious creative project that has yet to be developed. There’s a risk that, despite a creator’s best efforts, your reward will not be fulfilled, and we urge you to consider this risk prior to pledging. Kickstarter is not responsible for project claims or reward fulfillment.</p>
</div>

<div className='faq-h3'>
    <h3>FREQUENTLY ASKED QUESTIONS</h3>
</div>
<div className='faq'>
    <details>
        <summary>How do I pledge?</summary>
        Enter your pledge amount and select a reward. Then, enter your payment.
    </details>
    <details>
        <summary>When is my card charged?</summary>
        If this project is successfully funded, your card will be charged the following morning. If the project is not funded you will not pay anything.
    </details>
    <details>
        <summary>So I'm only charged if funding succeeds?</summary>
        Yes! If the project is not funded no one pays anything.
    </details>
    <details>
        <summary>What can others see about my pledge?</summary>
        This project will show up in a list of backed projects in your profile page. No financial information will be made public.
    </details>
    <details>
        <summary>What if I want to change my pledge?</summary>
        You can change or cancel your pledge anytime before {project.endDate}.
    </details>
    <details>
        <summary>If this project is funded, how do I get my reward?</summary>
        When your reward is ready, {project.creator.username} will send you an email for delivery information.
    </details>
    {/* <button className='pledge-button' onClick={() => editPledgeBtn}>Edit pledge</button> */}
</div>
</div>
</div>
</div>
</div>) : (<div className='pledge-main-container'> <h1>Oops, not found!</h1><img src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b_still_2x.gif?compress=1&resize=400x300&vertical=top"></img></div>)}
        
        </>
        )
    }
    export default PledgeDetails
