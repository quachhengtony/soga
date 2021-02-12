import React from "react";

export default function ActivitiesPage() {
  return (
    <div className="content">
      <div className="container-xl">
        {/* Page title */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Activities</h2>
              <div className="text-muted mt-1">Mentions, tasks with high priority and private messages</div>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="d-flex">
                <div className="me-3 d-none d-md-block">
                  <div className="input-icon">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search…"
                    />
                    <span className="input-icon-addon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx={10} cy={10} r={7} />
                        <line x1={21} y1={21} x2={15} y2={15} />
                      </svg>
                    </span>
                  </div>
                </div>
                {/* <a href="javascript:void(0)" className="btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <line x1={5} y1={12} x2={19} y2={12} />
                    </svg>
                    Add photo
                  </a> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="divide-y-4">
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <span className="avatar">PH</span>
                      </div>
                      <div className="col">
                        <div className="text-truncate">
                          <strong>Phạm Hạnh</strong> mentioned you in{" "}
                          <strong>[Thoka] #Lean Model Canvas</strong>.
                        </div>
                        <div className="text-muted">yesterday</div>
                      </div>
                      <div className="col-auto align-self-center">
                        <div className="badge bg-primary" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <span className="avatar">BT</span>
                      </div>
                      <div className="col">
                        <div className="text-truncate">
                          <strong>Bảo Trương</strong> assigned you to a new task
                          in <strong>[Thoka] #Thiết kế Logo</strong>.
                        </div>
                        <div className="text-muted">yesterday</div>
                      </div>
                      <div className="col-auto align-self-center">
                        <div className="badge bg-primary" />
                      </div>
                    </div>
                  </div>
                  {/* <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/002m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        It's <strong>Mallory Hulme</strong>'s birthday. Wish him well!
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                    <div className="col-auto align-self-center">
                      <div className="badge bg-primary" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/003m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Dunn Slane</strong> posted <strong>"Well, what do you want?"</strong>.
                      </div>
                      <div className="text-muted">today</div>
                    </div>
                    <div className="col-auto align-self-center">
                      <div className="badge bg-primary" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/000f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Emmy Levet</strong> created a new project <strong>Morning alarm clock</strong>.
                      </div>
                      <div className="text-muted">4 days ago</div>
                    </div>
                    <div className="col-auto align-self-center">
                      <div className="badge bg-primary" />
                    </div>
                  </div>
                </div> */}
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <span className="avatar">EM</span>
                      </div>
                      <div className="col">
                        <div className="text-truncate">
                          <strong>Elon Musk</strong> sent you a private message
                          in <strong>[Thoka]</strong>.
                        </div>
                        <div className="text-muted">2 days ago</div>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar">EP</span>
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Egan Poetz</strong> registered new client as <strong>Trilia</strong>.
                      </div>
                      <div className="text-muted">yesterday</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/002f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Kellie Skingley</strong> closed a new deal on project <strong>Pen Pineapple Apple Pen</strong>.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div> */}
                  {/* <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/003f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Christabel Charlwood</strong> created a new project for <strong>Wikibox</strong>.
                      </div>
                      <div className="text-muted">4 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar">HS</span>
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Haskel Shelper</strong> change status of <strong>Tabler Icons</strong> from <strong>open</strong> to <strong>closed</strong>.
                      </div>
                      <div className="text-muted">today</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/006m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Lorry Mion</strong> liked <strong>Tabler UI Kit</strong>.
                      </div>
                      <div className="text-muted">yesterday</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/004f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Leesa Beaty</strong> posted new video.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/007m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Perren Keemar</strong> and 3 others followed you.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar">SA</span>
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Sunny Airey</strong> upload 3 new photos to category <strong>Inspirations</strong>.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/009m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Geoffry Flaunders</strong> made a <strong>$10</strong> donation.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/010m.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Thatcher Keel</strong> created a profile.
                      </div>
                      <div className="text-muted">3 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/005f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Dyann Escala</strong> hosted the event <strong>Tabler UI Birthday</strong>.
                      </div>
                      <div className="text-muted">4 days ago</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar" style={{backgroundImage: 'url(./static/avatars/006f.jpg)'}} />
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Avivah Mugleston</strong> mentioned you on <strong>Best of 2020</strong>.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div> */}
                  {/* <div>
                  <div className="row">
                    <div className="col-auto">
                      <span className="avatar">AA</span>
                    </div>
                    <div className="col">
                      <div className="text-truncate">
                        <strong>Arlie Armstead</strong> sent a Review Request to <strong>Amanda Blake</strong>.
                      </div>
                      <div className="text-muted">2 days ago</div>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
