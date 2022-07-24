function formatRentalList(rentals) {
  const formattedRentals = rentals.map((rental) => ({
    ...rental,
    customer: {
      id: rental.customerId,
      name: rental.customerName,
    },
    game: {
      id: rental.gameId,
      name: rental.gameName,
      categoryId: rental.categoryId,
      categoryName: rental.categoryName,
    },
  }));

  formattedRentals.forEach((rental) => {
    delete rental.customerName;
    delete rental.gameName;
    delete rental.categoryId;
    delete rental.categoryName;
  });

  return formattedRentals;
}

export default formatRentalList;
