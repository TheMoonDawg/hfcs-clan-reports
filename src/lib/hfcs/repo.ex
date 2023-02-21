defmodule HFCS.Repo do
  use Ecto.Repo,
    otp_app: :hfcs,
    adapter: Ecto.Adapters.Postgres
end
