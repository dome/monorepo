import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import AppBody from '../AppBody'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`
const VoteCard = styled(DataCard)`
  background-color: #f7f6f5;
  overflow: hidden;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <AppBody>
      <PageWrapper gap="lg" justify="center">
        <TopSection gap="md">
          <VoteCard>
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.link color={'primaryText1'} fontWeight={600}>Uniswap liquidity mining</TYPE.link>
                </RowBetween>
                <RowBetween>
                  <TYPE.link color={'primaryText1'} fontSize={14}>
                    Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token.
                </TYPE.link>
                </RowBetween>{' '}
                <ExternalLink
                  style={{ color: 'white', textDecoration: 'underline' }}
                  href="https://uniswap.org/blog/uni/"
                  target="_blank"
                >
                  <TYPE.link color={'primaryText1'} fontSize={14}>Read more about UNI</TYPE.link>
                </ExternalLink>
              </AutoColumn>
            </CardSection>
          </VoteCard>
        </TopSection>

        <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
          <VoteCard>
            <DataRow style={{ alignItems: 'baseline' }}>
              <TYPE.mediumHeader color={'primaryText1'} style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
              <Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />
            </DataRow>

            <PoolSection>
              {stakingRewardsExist && stakingInfos?.length === 0 ? (
                <Loader style={{ margin: 'auto' }} />
              ) : !stakingRewardsExist ? (
                <TYPE.body color={'primaryText1'} style={{ marginTop: '0.1rem' }}>No active rewards</TYPE.body>
              ) : (
                    stakingInfos?.map(stakingInfo => {
                      // need to sort by added liquidity here
                      return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
                    })
                  )}
            </PoolSection>
          </VoteCard>
        </AutoColumn>
      </PageWrapper>
    </AppBody>
  )
}
