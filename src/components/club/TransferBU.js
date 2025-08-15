const transferLeaderUpdate = (cache, result) => {
    const {
      data: {
        transferLeader: { ok, id },
      },
    } = result;
    if (ok) {
      const fragmentId = `Member:${chosenLeader}`;
      const fragment =gql`
        fragment TransferLeader on Member {
          id
        }      
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("id" in result) {
        const { id: cacheTransferLeader } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            id: !cacheTransferLeader,
          },
        });
      }
    }
  
};