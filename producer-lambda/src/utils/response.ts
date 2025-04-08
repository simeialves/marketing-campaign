export const successResponse = (data: any) => ({
  statusCode: 200,
  body: JSON.stringify(data),
});

export const errorResponse = (err: any) => ({
  statusCode: 400,
  body: JSON.stringify({
    error: err.errors || err.message || "Erro ao processar requisição.",
  }),
});
