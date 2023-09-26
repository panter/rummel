import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { useRouter } from 'next/router';
import { gotoListOfSearchRequestInterests } from '../../../../lib/locations';
import { FormWithBottom } from '../../../forms/components/antd/FormComponents';
import { FormFooter } from '../../../forms/components/antd/FormFooter';
import { GenericGraphQLErrorAlert } from '../../../ui/core/components/GenericErrorAlert';
import { WaitForFormQuery } from '../../../ui/core/components/antd/WaitForQuery';
import { usePrismaForm } from '../../../ui/form/hooks/usePrismaForms';
import { SearchRequestInterestForm } from './SearchRequestInterestForm';
import { SearchRequestInterestBreadcrumb } from '../SearchRequestInterestBreadcrumb';
import { SearchRequestInterestUpdateResource } from '../../resource';

type SearchRequestInterestUpdateContainerProps = {
  style?: React.CSSProperties;
  className?: string;
  searchRequestInterestId: string;
};

const Base = styled.div``;

export const SearchRequestInterestUpdateContainer: React.FC<
  SearchRequestInterestUpdateContainerProps
> = ({ style, className, searchRequestInterestId }) => {
  const router = useRouter();

  const { formMutation, formQuery } = usePrismaForm({
    ...SearchRequestInterestUpdateResource,
    queryVariables: {
      where: { id: searchRequestInterestId },
    },
    onClose: (data) => {
      if (!data) {
        router.back();
        return;
      }

      router.push(gotoListOfSearchRequestInterests().href);
    },
  });

  return (
    <Base style={style} className={className}>
      <SearchRequestInterestBreadcrumb
        searchRequest={formQuery.model?.searchRequestInterest?.searchRequest}
        searchRequestInterest={formQuery.model?.searchRequestInterest}
      />
      <FormWithBottom>
        <WaitForFormQuery queryInfo={formQuery}>
          <SearchRequestInterestForm form={formMutation.form} />
        </WaitForFormQuery>
        <GenericGraphQLErrorAlert error={formMutation.error} />
      </FormWithBottom>
      <Divider />
      <FormFooter schemaForm={formMutation} justifyRow="start" stick />
    </Base>
  );
};
